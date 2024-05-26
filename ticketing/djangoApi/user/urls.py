from django.urls import path
from .views import UserRegistrationView, UserSectionsView, UserEventsView, UserUpdateView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user_register'),
    path('<uuid:uuid>/sections/', UserSectionsView.as_view(), name='user_sections_detail'),
    path('<uuid:uuid>/events/', UserEventsView.as_view(), name='user_events'),
    path('', UserUpdateView.as_view(), name='user_update')
    # path('login/', UserLoginView.as_view(), name='user_login')
]