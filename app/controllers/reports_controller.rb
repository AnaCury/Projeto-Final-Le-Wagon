class ReportsController < ApplicationController
  def index
    @reports = Report.all.order(:created_at)
    @markers = @reports.geocoded.map do |report|
      {
        lat: report.latitude,
        lng: report.longitude,
        info_window: render_to_string(partial: "reports/info_window", locals: { report: report })
      }
    end
  end

  def show_map
    @reports = Report.all
    @markers = @reports.geocoded.map do |report|
      {
        lat: report.latitude,
        lng: report.longitude,
        info_window: render_to_string(partial: "reports/info_window", locals: { report: report })
      }
    end
  end

  def show
    @report = Report.find_by(id: params[:id])
    if @report.nil?
      redirect_to reports_path
    else
      @reviews = @report.reviews
    end
  end

  def new
    @report = Report.new
  end

  def create
    @report = Report.new(report_params)
    @report.user = current_user
    if @report.save
      ActionCable.server.broadcast('reports', { action: 'create', json: @report, partial: render_to_string(partial: 'report', locals: { report: @report })})
      redirect_to reports_path(@report)
    else
      render :new
    end
  end

  def destroy
    @report = Report.find(params[:id])
    ActionCable.server.broadcast('reports', { action: 'destroy', json: @report })
    @report.destroy
    redirect_to reports_path
  end

  def close
    @report = Report.find(params[:report_id])
    @report.update!(status: false)
    redirect_to reports_path
  end

  private
  def report_params
    params.require(:report).permit(:description, :category, :danger_level, :address, :photo)
  end

end
