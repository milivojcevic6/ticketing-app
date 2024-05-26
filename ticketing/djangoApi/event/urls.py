from django.urls import path
from .views import EventCreateView, EventUpdateView

urlpatterns = [
    path('', EventCreateView.as_view(), name='event_create'),
    path('/<uuid:id>/', EventUpdateView.as_view(), name='event_update'),
    # Other URL patterns...
]