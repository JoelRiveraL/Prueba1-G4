from django.shortcuts import render,  get_object_or_404, redirect
from .models import Producto
import csv
import logging
from django.http import HttpResponse

productos = []

logger = logging.getLogger(__name__)


def listar_productos(request):
    # Consulta a la base de datos
    # Renderiza la plantilla listar.html
    productos = Producto.objects.all()
    return render(request, 'listar.html', {'productos': productos})


def crear_productos(request):
    if request.method == 'POST':
        nombre = request.POST['nombre']
        precio = float(request.POST['precio'])
        cantidad = int(request.POST['cantidad'])
        producto = Producto(nombre=nombre, precio=precio,
                            cantidad=cantidad)
        producto.save()
        return redirect('listar_productos')
    return render(request, 'create.html')


def editar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    if request.method == "POST":
        producto.nombre = request.POST.get('nombre', '')
        producto.precio = float(request.POST.get('precio', 0))
        producto.cantidad = int(request.POST.get('cantidad', 0))
        producto.save()
        return redirect('listar_productos')
    return render(request, 'editar.html', {'producto': producto})


def eliminar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    producto.delete()
    return redirect('listar_productos')


def importar_productos(request):
    if request.method == 'POST':
        logger.info("Método POST recibido")
        file = request.FILES['file']
        # Leer el archivo
        reader = csv.reader(file.read().decode('utf-8').splitlines())
        for row in reader:
            nombre = row[0]
            precio = float(row[1])
            cantidad = int(row[2])
            producto = Producto(
                nombre=nombre, precio=precio, cantidad=cantidad)
            producto.save()
        return redirect('listar_productos')
    return render(request, 'listar.html')

def exportar_productos(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="productos.csv"'
    writer = csv.writer(response)
    writer.writerow(['Nombre', 'Precio', 'Cantidad'])
    productos = Producto.objects.all()
    for producto in productos:
        writer.writerow([producto.nombre, producto.precio, producto.cantidad])
    return response