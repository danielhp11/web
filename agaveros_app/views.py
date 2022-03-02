from django.core.validators import EmailValidator
import requests
from requests.structures import CaseInsensitiveDict
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from agaveros_app.forms import FormRegistro,FormSession
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# Create your views here.

def index (request):
    return render(request,'index.html')

def simulador(request):
    return render(request,'simulador.html')

def session(request):
    formulario = FormSession()
    if request.method == 'POST':
        usuario = request.POST.get('usuario')
        clave = request.POST.get('clave')
        #messages.success(request,f"usu: {usuario} la clave {clave}")
        #redirect ('session')
        user = authenticate(request,username=usuario,password=clave)
        if user is not None:
          login(request,user)
          return redirect('indexLo')
        else:
            messages.success(request,"verifica que los datos introducidos sean correctos")
            return render(request,'session.html',{
                'form': formulario
            })


    return render(request,'session.html',{
        'form':formulario
    })

def exit_user(request):
    logout(request)
    return redirect('index')     
      
def registro(request):    
    if request.method == 'POST':
        formulario = FormRegistro(request.POST)
        if formulario.is_valid():
            formulario.save()
            messages.success(request,'Te has registrado corectamente, por favor inicia sesion')
            return redirect('session')
    else:
        formulario = FormRegistro()
        return render(request,'registro.html',{
            'form': formulario
        })

@login_required(login_url='index')
def indexLogin(request):
    return render(request,'login/index.html')

##########METODOS DEL API######
def setUserApi(request):
    user = request.POST.get('username')
    correo = request.POST.get('email')
    telefono = request.POST.get('first_name')
    pwd1 = request.POST.get('password1')
    pwd2 = request.POST.get('password2')
    url = "http://localhost:5000/auth/registrar"
    params = {
        "usuario" : user,
        "correo" : correo,
        "clave1" : pwd1,
        "clave2" : pwd2,
        "telefono" : telefono
    }          
    r = requests.post( url, json=params)
    return r.status_code  

def isUser(params):
    url = "http://localhost:5000/auth/login"
    r = requests.post( url, json=params)
    res = r.status_code
    return res

def getUserToken(params):    
    url = "http://localhost:5000/auth/login"
    r = requests.post( url, json=params)
    res = r.json()
    return res['access_token']

'''def confirmEmail(token,correo,codigo):
    url_usuario = 'http://localhost:5000/api/usuario/'+str(correo)
    params = {
        "token" : codigo
    }  
    headers = CaseInsensitiveDict()
    headers = {"Authorization": "Bearer "+str(token)}
    res = requests.put( url_usuario,headers=headers,json=params)
    return res.status_code '''

def obtener_usuario(correo,token):
    #se obtiene y alamcena el token
    tk = token
    url_usuario = 'http://localhost:5000/api/usuario/'+str(correo)
    headers = CaseInsensitiveDict()
    headers = {"Authorization": "Bearer "+str(tk)}
    res = requests.post( url_usuario,headers=headers)
    usu = res.json()
    return usu