from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.index, name="index"),
    path('signup/', views.signup, name='signup'),
    path('combobox/<str:name>', views.combobox, name='combobox'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('detail/<str:Pname>', views.detail,  name='detail'),
    path('cart', views.cart, name='cart'),
    path('checkout', views.checkout, name='checkout'),
    path('farmerprofile', views.farmerprofile, name='farmerprofile'),
    path('listproducts', views.listproducts, name='listproducts'),
]
