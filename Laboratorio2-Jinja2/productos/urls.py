from django.urls import path
from . import views

urlpatterns = [
    # URLs de vistas normales
    # Crear la URL de la vista index
    path('', views.listar_productos, name='listar_productos'),
    path('editar/<int:id>/', views.editar_producto, name='editar_producto'),
    path('borrar/<int:id>/', views.eliminar_producto, name='borrar_producto'),
    path('crear/', views.crear_productos, name='crear_productos'),
    # URL para inportar datos en csv
    path('importar_productos/', views.importar_productos, name='importar_productos'),
    #URL para exportar datos en csv
    path('exportar_productos/', views.exportar_productos, name='exportar_productos'),   
]
