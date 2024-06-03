from django.urls import path
from .views import TicketCreateView, TicketDetailView

urlpatterns = [
    path('create/', TicketCreateView.as_view(), name='ticket_create'),
    path('<uuid:id>/', TicketDetailView.as_view(), name='ticket_detail'),
]
