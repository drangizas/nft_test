from webbrowser import get
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import UserAuthSerializer


class CreateUserView(CreateAPIView):
    model = User
    serializer_class = UserAuthSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        token = Token.objects.create(user=serializer.instance)

        return Response(
            {
                'user': serializer.data,
                'token': token.key,
            },
            status=status.HTTP_201_CREATED,
        )


class ObtainAuthTokenView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'user_id': user.id,
            'token': token.key,
        })


class CheckIfLoggedInView(APIView):

    def get(self, request, *args, **kwargs):
        serializer = UserAuthSerializer(instance=request.user)

        return Response({
            'logged_in': request.user.is_authenticated,
            'user': serializer.data,
        })
