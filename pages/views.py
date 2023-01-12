from django.shortcuts import render, redirect
from .models import ComboBox, CustomerProfile, ProductDetail, Cart
from django.contrib.auth.models import auth, User
from django.contrib import messages
from django.utils.html import strip_tags

# Create your views here.

name = ''


def index(request):
    global name
    response = render(request, 'index.html', {'name': name})
    try:
        cart = request.COOKIES['cart']
        print(cart)
    except(KeyError):
        response.set_cookie('cart', '')
    return response


def signup(request):
    if request.method == 'GET':
        return render(request, 'signup.html')
    elif request.method == 'POST':
        full_name = strip_tags(request.POST['Full Name'])
        email = strip_tags(request.POST['E-mail'])
        password = strip_tags(request.POST['password'])
        mobile_no = strip_tags(request.POST['mobile-number'])
        if list(User.objects.filter(username=email)) != [] or list(User.objects.filter(email=email)) != []:
            messages.info(request, 'Email Already Exists')
            return redirect('signup')
        else:
            usr = User.objects.create_user(username=email, email=email, password=password)
            usr.customerprofile_set.create(full_name=full_name, mobile_no=mobile_no)
            usr.save()
            return redirect('login')


def combobox(request, name):
    box = ComboBox.objects.all()
    if name == 'veggies':
        cb = box[0]
    elif name == 'fruits':
        cb = box[1]
    elif name == 'dairy':
        cb = box[2]
    return render(request, 'combobox.html', {'box': cb})


def login(request):
    global name
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = auth.authenticate(username=email, password=password)
        if user is not None:
            auth.login(request, user)
            name = user.customerprofile_set.all()[0].full_name
            print(name)
            return redirect('/')
        else:
            messages.info(request, 'Invalid Credentials')
            return redirect('login')


def logout(request):
    global name
    name = ''
    auth.logout(request)
    return redirect('/')


def detail(request, Pname):
    product = ProductDetail.objects.get(Product_Name=Pname)
    return render(request, 'product-detail.html', {'product': product})


def cart(request):
    ref = request.META['HTTP_REFERER']
    cart = request.COOKIES['cart']
    cart_items = []
    total_price = 0
    if 'detail' in ref:
        if cart != '' and ref.split('/')[-1] not in cart:
            cart += ',' + ref.split('/')[-1]
        elif cart == '':
            cart = ref.split('/')[-1]
        for item in cart.split(','):
            try:
                cart_items.append(ProductDetail.objects.get(Product_Name=item))
                price = 0
                for charecter in cart_items[-1].Product_Price:
                    if charecter.isdigit():
                        price = price * 10 + int(charecter)
                print(price)
                total_price += price
                print(total_price)
            except(ProductDetail.DoesNotExist):
                break
    if cart_items == []:
        cart_items = None
    response = render(request, 'cart.html', {'cart_items': cart_items, 'total_price': total_price})
    response.set_cookie('cart', cart)
    return response


def checkout(request):
    return render(request, 'checkout.html')


def farmerprofile(request):
    return render(request, 'farmer-profile.html')


def listproducts(request):
    return render(request, 'product-list.html')
