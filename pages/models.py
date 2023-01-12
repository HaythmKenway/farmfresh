from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class ComboBox(models.Model):
    main_image = models.ImageField()
    description = models.CharField(max_length=250)
    content_1 = models.ImageField()
    con1desc = models.CharField(max_length=100)
    content_2 = models.ImageField()
    con2desc = models.CharField(max_length=100)
    content_3 = models.ImageField()
    con3desc = models.CharField(max_length=100)
    content_4 = models.ImageField()
    con4desc = models.CharField(max_length=100)
    content_5 = models.ImageField()
    con5desc = models.CharField(max_length=100)
    content_6 = models.ImageField()
    con6desc = models.CharField(max_length=100)


class CustomerProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=10)

    def name(self):
        return self.full_name


class ProductDetail(models.Model):
    Product_Image = models.ImageField()
    Product_Name = models.CharField(max_length=100)
    Product_Price = models.CharField(max_length=10)

    def __str__(self):
        return self.Product_Name


class Cart(models.Model):
    Product_Name = models.CharField(max_length=100)
