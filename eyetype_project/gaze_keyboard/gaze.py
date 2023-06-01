from django.urls import path
from gaze_keyboard import views

urlpatterns = [
    path('keyboard/', views.keyboard_view, name='keyboard'),
    # Add more URL patterns as needed
]
