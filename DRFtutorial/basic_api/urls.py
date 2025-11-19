# basic_api/urls.py
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from basic_api import views

urlpatterns = [
    path('basic/', views.API_objects.as_view()),
    path('basic/<int:pk>/', views.API_objects_details.as_view()),
    path('basic/view/', views.post_list, name='post_list'),
    path('basic/create/', views.post_create, name='post_create'),
    path('basic/edit/<int:pk>/', views.post_edit, name='post_edit'),
    path('basic/delete/<int:pk>/', views.post_delete, name='post_delete'),
]

urlpatterns = format_suffix_patterns(urlpatterns)