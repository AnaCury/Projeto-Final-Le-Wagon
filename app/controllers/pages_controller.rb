class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home

  end

  def maps

  end

  def getMapData

    # @outcome = ActiveRecord::Base.connection.execute([
    #   "SELECT R.*,U.first_name,U.last_name FROM reports R join users U on U.id = R.user_id where danger_level in (:danger_level) limit 1400",danger_level: params['pinsToShow']
    #   # "SELECT R.*,U.first_name,U.last_name FROM reports R join users U on U.id = R.user_id where danger_level in limit 1400"
    # ])
    # @outcome.to_a
    # "1,2,3,4,5"

    query="SELECT R.*,U.first_name,U.last_name FROM reports R join users U on U.id = R.user_id where danger_level in ("+params['pinsToShow']+") limit 1500"



    @outcome = ActiveRecord::Base.connection.execute(query)

    # render json: params['pinsToShow']
    render json: @outcome
  end


end
