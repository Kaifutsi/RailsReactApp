Rails.application.routes.draw do
  devise_for :admins
  root to: 'news#index'
  resources :news, only: [:show, :index]

  namespace :admin do
    get '/', to: redirect('/admin/news')
    resources :news
  end
end
