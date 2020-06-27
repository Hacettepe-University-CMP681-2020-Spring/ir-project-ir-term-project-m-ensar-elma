from django.conf.urls import url

from Post.views import home_view
urlpatterns = [

    url(r'^/', home_view )
]