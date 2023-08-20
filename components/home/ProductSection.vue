<template>
  <div class="flex mx-auto container flex-col justify-center items-center px-[22px] lg:px-[75px] pb-20">
    <h3 class="text-gray-700 text-xl lg:text-[34px] leading-4 font-bold lg:pb-12 pb-4">
      {{ $t('home_products_title') }}
    </h3>
    <div dir="ltr"
      class="overflow-hidden hover:overflow-x-auto flex w-full mx-auto justify-start lg:gap-[44px] gap-5 pb-4">

      <div v-for="product in products" :key="product.id"
        class="flex flex-shrink-0 flex-col justify-start lg:w-[268px] w-[175px]">
        <div class="relative w-full">
          <img class="w-full lg:h-[267px] h-[170px]" :src="product.image">
          <NuxtLink :to="product.link"
            class="absolute bg-[#f9fafb9e] lg:p-2 p-1 rounded-full lg:bottom-[32px] bottom-[7px] lg:right-[12px] right-[10px] text-gray-700 text-base lg:text-xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-[26px] w-5 h-5 lg:h-[26px] " viewBox="0 0 26 26"
              fill="none">
              <path
                d="M4.67785 6.84448C2.77405 8.74829 2.77405 11.835 4.67785 13.7388L13.0001 22.061L21.3221 13.7388C23.226 11.835 23.226 8.74829 21.3221 6.84448C19.4183 4.94067 16.3317 4.94067 14.4279 6.84448L13.0001 8.27239L11.5721 6.84448C9.66834 4.94067 6.58166 4.94067 4.67785 6.84448Z"
                stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </div>
        <div :dir="$lang.dir"
          class="w-full gap-4 lg:h-[255px] h-[230px] flex flex-col pt-[11px] pb-[15px] px-2 bg-[#FFF]">
          <NuxtLink :to="product.link" class="line-clamp-2 lg:text-base text-xs text-gray-900 font-normal">{{ product.name
          }}</NuxtLink>
          <!-- Tags -->
          <div v-if="product.tags && product.tags.length" class="flex flex-wrap justify-start gap-[10px]">
            <span v-for="tag, index in product.tags" :key="tag.id">
              <span class="text-center px-3 font-normal text-xs text-gray-900 bg-[#D9D9D9] rounded-md" v-if="index < 2">{{
                tag.name }}</span>
            </span>
          </div>
          <!-- price -->
          <div v-if="product.special" class="flex gap-2 justify-start">
            <span class="text-red-600 font-bold lg:text-base text-xs">
              {{ product.special }}
            </span>
            <del class="text-gray-900 font-normal lg:text-base text-xs">
              {{ product.price }}
            </del>
          </div>
          <div v-else class="flex gap-2 justify-start">
            <span class="text-gray-900 font-bold lg:text-base text-xs">
              {{ product.price }}
            </span>
          </div>
          <!-- Colors -->
          <div v-if="product.colors && product.colors.length" class="flex justify-start gap-[11px] flex-wrap">
            <span v-for="color, index in product.colors" :key="color.hex"
              :class="[(color.hex == product.color ? 'ring-1 ring-gray-900' : ''), ('relative  flex items-center justify-center rounded-full w-7 h-7 z-20')]">
              <span class="rounded-full w-6 h-6 z-40" :style="['background-color:' + color.hex]">
              </span>
              <span v-if="color.stock" class="absolute border-b-black border-b w-8 -rotate-45 z-50"></span>
            </span>
          </div>
          <!-- Card -->
          <div class="w-full flex flex-col justify-end flex-1">
            <Button type="button" color="black"
              class="items-center justify-center font-extrabold lg:text-sm text-xs shadow-sm text-white">{{
                $t('home_products_cart_btn') }}</Button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
const { $lang } = useNuxtApp()
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