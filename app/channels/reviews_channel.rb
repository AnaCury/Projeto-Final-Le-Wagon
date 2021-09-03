class ReviewsChannel < ApplicationCable::Channel
  def subscribed
    report = Report.find(params[:id])
    stream_for report
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
