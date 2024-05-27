from django.urls import path
from .views import EventCreateView, EventUpdateView, EventDeleteView

urlpatterns = [
    path('', EventCreateView.as_view(), name='event_create'),
    path('<uuid:id>/', EventUpdateView.as_view(), name='event_update'),
    path('<uuid:id>/delete/', EventDeleteView.as_view(), name='event_delete'),
    # Other URL patterns...
];