from django.urls import path
from .views import SectionRegistrationView, SectionLoginView, SectionListView, SectionEventsView, SectionUpdateView, SectionPasswordChangeView

urlpatterns = [
    path('', SectionListView.as_view(), name='section_list'),
    path('register/', SectionRegistrationView.as_view(), name='section_register'),
    path('login/', SectionLoginView.as_view(), name='section_login'),
    path('<uuid:uuid>/events/', SectionEventsView.as_view(), name='section_events'),
    path('update/', SectionUpdateView.as_view(), name='section_update'),
    path('change-password/', SectionPasswordChangeView.as_view(), name='section_change_password')

];