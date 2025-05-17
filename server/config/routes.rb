Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace "api" do
    scope :auth do
      post "login", to: "auth#login"
      post "signup", to: "auth#signup" # 単一のsignupルートを有効化
      # post "signup/company", to: "auth#signup_company" # 削除またはコメントアウト
      # post "signup/intern", to: "auth#signup_intern"   # 削除またはコメントアウト
      get "me", to: "auth#me"
    end

    scope :companies do
      get ":id", to: "companies#show"
    end
    
    scope :interns do
      get ":id", to: "interns#show"
    end

    scope :profiles do
      get "companies", to: "companies#index"
      get "interns", to: "interns#index"
    end

  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
