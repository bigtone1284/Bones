class GamesController < ApplicationController

	before_action :authenticate

	def index
	end

	def show
    @game = Game.find(params[:id])
    if @game.users.length < 4 && !@game.users.include?(User.find(session[:current_user_id]))
    	@game.users.push(User.find(session[:current_user_id]))
    end
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @game}
    end
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.create() 
    redirect_to @game
  end

  def edit
    @game = Game.find(params[:id])
  end

  def update
    @game = Game.find(params[:id])
    @game.update(game_params)  
    render 
  end

  private

  def game_params
  	params.require(:game).permit(:active, :finished, :winner, :moves, :train, :boneyard, :hand1, :hand2, :hand3, :hand4)
  end

end