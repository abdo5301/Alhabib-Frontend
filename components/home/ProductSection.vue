<template>
  <div class="flex mx-auto container flex-col justify-center items-center px-[22px] lg:px-[75px] pb-20">
    <h3 class="text-gray-700 text-xl lg:text-[34px] leading-4 font-bold lg:pb-12 pb-4">
      {{ $t('home_products_title') }}
    </h3>
    <div dir="ltr"
      class="overflow-hidden hover:overflow-x-auto flex w-full mx-auto justify-start lg:gap-[44px] gap-5 pb-4">

      <HomeProductItem v-for="product in products"
       :key="product.id"
       :id="product.id"
       :name="product.name"
       :image="product.image"
       :color="product.color"
       :price="product.price"
       :special="product.special"
       :link="product.link"
       :favorite="product.favorite"
       :tags="product.tags"
       :colors="product.colors"
       @favorite-click="product.favorite = !product.favorite"
       ></HomeProductItem>
    </div>
  </div>
</template>


<script setup>
const { t } = useI18n()
const currency = t('sar')
const products = [
  {
    'id': 1,
    'image': '/images/product/product-1.jpeg',
    'name': 'مفرش فندقي نداف موف فاتح 250 غرزة',
    'price': 149 + ' ' + currency,
    'special': 99 + ' ' + currency,
    'link': '#',
    'color': '#FAC8D3',
    'favorite': true,
    'tags': [
      {
        'id': 1,
        'name': '6 قطع',
      },
      {
        'id': 2,
        'name': 'الاكثر مبيعًا',
      },
      {
        'id': 3,
        'name': 'مخفض',
      },
    ],
    'colors': [
      {
        'hex': '#AF957E',
        'stock': 1
      },
      {
        'hex': '#FAC8D3'
      },
      {
        'hex': '#1A1919'
      }
    ]
  },
  {
    'id': 2,
    'image': '/images/product/product-2.jpeg',
    'name': 'مفرش فندقي نداف موف فاتح 250 غرزة',
    'price': 149 + ' ' + currency,
    'special': 99 + ' ' + currency,
    'link': '#',
    'color': '#AF957E',
    'favorite': true,
    'tags': [
      {
        'id': 1,
        'name': '6 قطع',
      },
      {
        'id': 2,
        'name': 'الاكثر مبيعًا',
      }
    ],
    'colors': [
      {
        'hex': '#AF957E'
      },
      {
        'hex': '#FAC8D3'
      },
      {
        'hex': '#1A1919'
      }
    ]
  },
  {
    'id': 3,
    'image': '/images/product/product-3.jpeg',
    'name': 'مفرش سمر لاند صيفي خفيف مضغوط   مفرد ونص برسومات الزهور مفرش سمر لاند صيفي خفيف مضغوط   مفرد ونص برسومات الزهور ',
    'price': 149 + ' ' + currency,
    'special': 99 + ' ' + currency,
    'link': '#',
    'color': '#AF957E',
    'favorite': false,
    'tags': [
      {
        'id': 1,
        'name': '6 قطع',
      }
    ],
    'colors': [
      {
        'hex': '#AF957E'
      },
      {
        'hex': '#FAC8D3'
      },
      {
        'hex': '#1A1919',
        'stock': 1
      }
    ]
  },
  {
    'id': 4,
    'image': '/images/product/product-1.jpeg',
    'name': 'مفرش فندقي نداف موف فاتح 250 ',
    'price': 149 + ' ' + currency,
    'special': 99 + ' ' + currency,
    'link': '#',
    'color': '#FAC8D3',
    'favorite': false,
    'tags': [
      {
        'id': 1,
        'name': '4 قطع',
      }
    ]
  },
  {
    'id': 5,
    'image': '/images/product/product-2.jpeg',
    'name': 'مفرش فندقي نداف موف فاتح 250 غرزة',
    'price': 149 + ' ' + currency,
    'special': 99 + ' ' + currency,
    'link': '#',
    'color': '#AF957E',
    'tags': [],
    'favorite': true,
    'colors': [
      {
        'hex': '#AF957E'
      },
      {
        'hex': '#FAC8D3'
      },
      {
        'hex': '#1A1919'
      }
    ]
  }
]
</script>