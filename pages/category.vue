<template>
  <div class="pb-[104px]">
    <Breadcrumb class="pb-[40px]" :pages=breadcrumb></Breadcrumb>

    <div class="px-[25px] lg:px-[68px]">
      <CategoryDescription :title="title" :content="content" class="pt-4" />
      <CategorySubCategory :categories="sub_category" class="lg:pt-[64px] pt-8" />
    </div>
    <!-- Filter start -->
    <div
      class="lg:px-[68px] mb-[15px] border-t border-b h-[60px] border-gray-100 mt-[54px] hidden lg:flex items-center justify-start">

      <h3 class="text-gray-700 font-bold text-base leading-5 rtl:pr-3 ltr:pl-3">
        {{ $t("category_filter_title") }}
      </h3>
      <span class="border-r-2 mx-[29px] border-gray-400 h-6"></span>
      <!-- filter selected tags -->
      <div class="mx-[100px] flex gap-5 items-center justify-start flex-1">
        <CategoryFilterTag v-for="selected_filter in filter_array" :key="selected_filter" :name="selected_filter"
          @remove-filter-item="updateFilterArray" />
      </div>
      <CategorySortingMenu />
    </div>

    <div class="flex lg:gap-[46px] lg:px-[68px] px-6 flex-col lg:flex-row">
      <!-- Desktop Filter -->
      <div class="hidden lg:block w-[295px] text-gray-700 font-bold text-base leading-5 rtl:pr-4 ltr:pl-3 pt-[15px]">
        <div id="accordion-arrow-icon" data-active-classes="bg-gray-50" data-inactive-classes="py-5"
          data-accordion="open">
          <CategoryFilterSection v-for="filter_section, index in filter_data" v-model="filter_array[filter_section.name]"
            :filter_array="filter_section.data" :title="filter_section.name" :key="filter_section.key"
            :filter_key="filter_section.key" :first_item="index == 0 ? true : false" @filter-value="updateFilterArray"
            :selected_filter_array="filter_array" />
        </div>
      </div>
      <!-- Mobile Filter -->
      <div class="lg:hidden flex justify-center items-center gap-5">
        <!-- Filter -->
        <CategoryMobileFilter @filter-reset="resetFilter" :filter_data="filter_data" :selected_filter_array="filter_array" @filter-value="updateFilterArray">{{ $t("category_filter_title_mobile") }}</CategoryMobileFilter>
        <!-- Sorting -->
        <CategoryMobileSortingMenu>{{ $t("category_sorting_title_mobile") }}</CategoryMobileSortingMenu>
      </div>
      <!-- Mobile listing switch buttons -->
      <div class="lg:hidden flex justify-end items-center gap-1 pt-[26px]">
        <CategoryListingSwitch @update-listing="listingTypeUpdate"/>
      </div>
      <!-- Product listing -->
      <div :class="[listing_type=='solo'?'gap-[18px]':'gap-y-[45px] gap-x-[27px]',
      'lg:mt-2 mt-5 flex flex-wrap items-stretch justify-start gap-[42px] lg:gap-y-[55px]']">
        <CategoryProductItem v-for="product in category_data.data" :key="product.id" :id="product.id" :name="product.name"
          :image="product.image" :color="product.color" :price="product.started_price + ' ' + currency"
          :special="product.started_discounted_price + ' ' + currency" :link="localePath('/category')"
          :favorite="product.favorite" :tags="product.tags" :related_products="product.related_class_products"
          @favorite-click="product.favorite = !product.favorite" :list_type="listing_type"/>
      </div>
    </div>
    <!-- Filter end -->

    <CategoryDescription :title="title" :content="content"
      class="mt-[90px] px-[25px] lg:rtl:pr-[68px] lg:rtl:pl-[113px] lg:ltr:pl-[68px] lg:ltr:pr-[113px]" />

  </div>
</template>

<script setup>
const category_data = shallowRef(await useNuxtApp().$apiFetch('/master-products/of-category?category_id=8'))
const filter_array = ref([])
const listing_type = ref('list')
function listingTypeUpdate(new_list_type){
  listing_type.value = new_list_type
}
function updateFilterArray(filter_value) {
  if (filter_array.value.includes(filter_value)) {
    filter_array.value.splice(filter_array.value.indexOf(filter_value), 1)
  } else {
    filter_array.value.push(filter_value)
  }
}
function resetFilter(){
  filter_array.value = []
}

const title = 'المفارش';
const content = 'نحرص في مفارش الحبيب على توفير أجود أنواع المفارش، بأقمشة متنوعة من القطن والبوليستر و المخمل والفرو وغيرها، وبأشكال وألوان عديدة تلبّي احتياجات جميع الأذواق';

const localePath = useLocalePath()
const lang = useNuxtApp().$lang
const { t } = useI18n()
const currency = t('sar')

const breadcrumb = [
  {
    'name': 'مفارش وبطانيات',
    'link': localePath('/category')
  },
  {
    'name': 'مفارش',
    'link': localePath('/category')
  }
]

const sub_category = [
  {
    'id': 1,
    'name': 'مفارش',
    'slug': '/category',
    'image': '/images/category/baby.png'
  },
  {
    'id': 2,
    'name': 'مفارش صيفية',
    'slug': '/category',
    'image': '/images/category/bedding.png'
  },
  {
    'id': 3,
    'name': 'مفارش شتوية',
    'slug': '/category',
    'image': '/images/category/cushions.png'
  },
  {
    'id': 4,
    'name': 'لباد واقي مرتبه وحشوة لحاف',
    'slug': '/category',
    'image': '/images/category/lbad.png'
  }
]

const filter_data = [
  {
    'id': 1,
    'name': 'المقاس',
    'key': 'size',
    'data': [
      {
        'id': 1,
        'name': 'مزدوج',
      },
      {
        'id': 2,
        'name': 'مفرد ونص'
      },
      {
        'id': 3,
        'name': 'كوين'
      },
    ]
  },
  {
    'id': 2,
    'name': 'اللون',
    'key': 'color',
    'data': [
      {
        'id': 4,
        'name': 'أزرق',
        'image': '/images/colors/blue.svg',
      },
      {
        'id': 5,
        'name': 'أخضر',
        'image': '/images/colors/green.svg',
      },
      {
        'id': 6,
        'name': 'أحمر',
        'image': '/images/colors/red.svg',
      },
      {
        'id': 20,
        'name': 'متعدد الألوان',
        'image': '/images/colors/multi-colors.svg',
      },
      {
        'id': 21,
        'name': 'أبيض',
        'image': '/images/colors/wight.svg',
      },
      {
        'id': 22,
        'name': 'أسود',
        'image': '/images/colors/black.svg',
      },
    ]
  },
  {
    'id': 3,
    'name': 'السعر',
    'key': 'price',
    'data': [
      {
        'id': 7,
        'name': '500 فما أعلى'
      },
      {
        'id': 8,
        'name': '200 - 400'
      },
      {
        'id': 9,
        'name': 'أقل من 200'
      },
    ]
  },
  {
    'id': 4,
    'name': 'عدد القطع',
    'key': 'pieces',
    'data': [
      {
        'id': 10,
        'name': '4 قطع'
      },
      {
        'id': 11,
        'name': '5 قطع'
      },
      {
        'id': 12,
        'name': '6 قطع'
      },
      {
        'id': 13,
        'name': '7 قطع'
      },
      {
        'id': 14,
        'name': '8 قطع'
      },
      {
        'id': 15,
        'name': '6 قطع'
      },
    ]
  }

]

</script>