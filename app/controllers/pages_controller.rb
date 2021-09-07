class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @user = User.new
  end
  def maps
    @report = Report.new
  end
end
