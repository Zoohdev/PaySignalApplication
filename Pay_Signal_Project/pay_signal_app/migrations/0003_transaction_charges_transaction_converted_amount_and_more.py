# Generated by Django 5.1.2 on 2024-12-05 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pay_signal_app', '0002_conversionrate_alter_account_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='charges',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='transaction',
            name='converted_amount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True),
        ),
        migrations.AddField(
            model_name='transaction',
            name='encrypted_amount',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='id',
            field=models.CharField(default='55d251f31e9a48d1823f', max_length=20, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='status',
            field=models.CharField(choices=[('PENDING', 'Pending'), ('COMPLETED', 'Completed'), ('FAILED', 'Failed'), ('CANCELLED', 'Cancelled')], default='PENDING', max_length=20),
        ),
    ]