from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from ..users.mixens import CustomLoginRequiredMixin
from .models import CartModel
from .serializers import CartSerializer,CartAddSerializer

# Create your views here.

class CartList(CustomLoginRequiredMixin,generics.ListAPIView):
    queryset = CartModel.objects.all()
    serializer_class=CartAddSerializer


    def get(self, request, *args, **kwargs):
        self.queryset = CartModel.objects.order_by('-created_at').filter(user=request.login_user)
        return super().get(request, *args, **kwargs)
    
class CartAdd(CustomLoginRequiredMixin,generics.CreateAPIView):
    queryset=CartModel.objects.all()
    serializer_class=CartAddSerializer

    def post(self, request, *args, **kwargs):
        request.data['user']=request.login_user.id
        return super().post(request, *args, **kwargs)

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from apps.cart.models import CartModel
from apps.cart.serializers import CartSerializer # Assuming this is the correct import for your mixin

class CartDelete(CustomLoginRequiredMixin, generics.DestroyAPIView):
    queryset = CartModel.objects.all()
    serializer_class = CartSerializer

    def delete(self, request, *args, **kwargs):
        try:
            cart = CartModel.objects.get(pk=self.kwargs['pk'])
        except CartModel.DoesNotExist:
            response = Response({'error': 'Cart item does not exist'}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = 'application/json'
            response.renderer_context = {}
            return response

        if cart.user.id != request.login_user.id:
            response = Response({'error': 'You cannot delete the cart list not owned by you'}, status=status.HTTP_403_FORBIDDEN)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = 'application/json'
            response.renderer_context = {}
            return response

        return super().delete(request, *args, **kwargs)

    

class CartUpdate(CustomLoginRequiredMixin, generics.UpdateAPIView):
    queryset = CartModel.objects.all()
    serializer_class = CartSerializer

    def update(self, request, *args, **kwargs):
        try:
            cart = CartModel.objects.get(pk=self.kwargs['pk'])
        except CartModel.DoesNotExist:
            response = Response({'error': 'Cart item does not exist'}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = 'application/json'
            response.renderer_context = {}
            return response

        if cart.user.id != request.login_user.id:
            response = Response({'error': 'You cannot update the cart list not owned by you'}, status=status.HTTP_403_FORBIDDEN)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = 'application/json'
            response.renderer_context = {}
            return response

        cart.quantity = request.data.get('quantity', cart.quantity)
        cart.save()
        serializer = CartSerializer(cart)

        return Response(serializer.data)