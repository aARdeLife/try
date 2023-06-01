from django.urls import path
from . import views

urlpatterns = [
    path('eye-tracking/', views.eye_tracking_view, name='eye_tracking'),
]
