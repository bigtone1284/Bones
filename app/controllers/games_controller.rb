class GamesController < ApplicationController

	before_action :authenticate

	def index
	end

	def show
    @game = Game.find(params[:id])
    if @game.users.length < 4 && !@game.users.include?(User.find(session[:current_user_id]))
    	@game.users.push(User.find(session[:current_user_id]))
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
    redirect_to @game
  end

  private

  def game_params
  	params.require(:game).permit()
  end

end