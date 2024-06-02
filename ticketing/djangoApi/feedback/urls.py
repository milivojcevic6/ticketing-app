from django.urls import path
from .views import FeedbackCreateOrUpdateView, FeedbackUpdateView

urlpatterns = [
    path('create/', FeedbackCreateOrUpdateView.as_view(), name='feedback_create'),
    path('<uuid:id>/', FeedbackUpdateView.as_view(), name='feedback_update'),
]