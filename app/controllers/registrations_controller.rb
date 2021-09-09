class RegistrationsController < ApplicationController
  # instantiates new user

  skip_before_action :authenticate_user!, :only => :create
  # skip_before_action :authenticate_user!, :only => :new

  def new
    @user = User.new()

  end
  def create
    @user = User.new(new_user_params)

    # render json: user.errors.full_messages
    if @user.save
    # # # # stores saved user id in a sessionlogin_user
      session[:id] = @user.id
      sign_in @user, :bypass=>true
      render :json => {:status => 1, :users => @user, :session => @session}
      # redirect_to maps_path
    # # #   # redirect_to root_path, notice: 'Successfully created account'
    else
      render json: {:status => 0, :users => @user.errors.full_messages}
    end
  end

  private
  def user_params
    # strong parameters
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
  def new_user_params
    # strong parameters
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :email, :cpf, :phone_number, :password, :password_confirmation)
  end
end

# user = User.create(id: 4000,first_name:"a",email:"a@gmai.com",last_name:"b", cpf: "1", phone_number: "1", created_at: '2021-10-01', updated_at: '2021-10-01')
