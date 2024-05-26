from django.urls import path
from .views import SectionRegistrationView, SectionLoginView, SectionListView, SectionEventsView

urlpatterns = [
    path('', SectionListView.as_view(), name='section_list'),
    path('register/', SectionRegistrationView.as_view(), name='section_register'),
    path('login/', SectionLoginView.as_view(), name='section_login'),
    path('<uuid:uuid>/events/', SectionEventsView.as_view(), name='section_events'),
];