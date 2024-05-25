from django.urls import path
from .views import SectionRegistrationView, SectionLoginView, SectionListView

urlpatterns = [
    path('', SectionListView.as_view(), name='section_list'),
    path('register/', SectionRegistrationView.as_view(), name='section_register'),
    path('login/', SectionLoginView.as_view(), name='section_login'),
];