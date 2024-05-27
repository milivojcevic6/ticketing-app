from django.urls import path
from .views import UserRegistrationView, UserSectionsView, UserEventsView, UserUpdateView, UserPasswordChangeView, \
    UserTicketsView

urlpatterns = [
    path('', UserUpdateView.as_view(), name='user_update'),
    path('change-password/', UserPasswordChangeView.as_view(), name='user_change_password'),
    path('register/', UserRegistrationView.as_view(), name='user_register'),
    path('<uuid:uuid>/sections/', UserSectionsView.as_view(), name='user_sections_detail'),
    path('<uuid:uuid>/events/', UserEventsView.as_view(), name='user_events'),
    path('<uuid:user_id>/tickets/', UserTicketsView.as_view(), name='user_tickets'),
];
