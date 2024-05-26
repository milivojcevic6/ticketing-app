# cards/urls.py
from django.urls import path
from .views import CardCreateView

urlpatterns = [
    path('', CardCreateView.as_view(), name='card_create'),
]
