from django.urls import path
from . import views

urlpatterns = [
    path("index/", views.index),
    path("summery/", views.summery),
    path("foods/", views.handle_foods),
    path("orders/", views.handle_orders),
    path("ordersTable/", views.get_order_table),
    path("most_famous/main_dish", views.famous_main_dish),
    path("most_famous/side_dish", views.famous_side_dish)
]