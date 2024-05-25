from django.urls import path
from .views import SectionRegistrationView, SectionLoginView

urlpatterns = [
    path('register/', SectionRegistrationView.as_view(), name='section_register'),
    path('login/', SectionLoginView.as_view(), name='section_login'),
]