<template>
  <div class="w-full flex flex-col gap-[44px] lg:gap-[65px] bg-white py-5 px-5 lg:px-[30px] rounded-lg shadow">
    <div v-if="rating_success" class="h-[335px] lg:h-[412px] w-full flex flex-col justify-center items-center gap-9">
      <img src="/images/icons/true-black.png" class="w-[65px] h-[65px] lg:w-[93px] lg:h-[93px]" alt="Rating Success">
      <div
        class="flex items-center justify-center text-center flex-col gap-6 lg:gap-8 text-gray-900 text-base lg:text-2xl font-bold">
        <span class="">{{ $t('text_rating_success_1') }}</span>
        <span class="">{{ $t('text_rating_success_2') }}</span>
      </div>
    </div>
    <form v-else @submit.prevent="save_rating" class="w-full flex flex-col gap-[44px] lg:gap-[65px]">
      <div class="w-full flex flex-col gap-5 justify-center items-center">
        <img class="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-md"
          :src="product_image ? product_image : '/images/placeholder-logo.png'" :alt="product_name">
        <span class="text-center text-gray-600 font-medium text-xs lg:text-sm">{{ product_name }}</span>
      </div>
      <AccountRatingItem :rating="Number(0)" :rating_title="$t('text_review_title_ask')"
        @update-rating="rating_stars = $event" />
      <div class="w-full flex flex-col lg:px-[18px]">
        <label for="message" class="sr-only">Review Content</label>
        <textarea v-model="rating_review" :id="'product-review-' + product_id" rows="6"
          class="block p-2 lg:p-3 w-full font-semibold text-xs lg:text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-50 focus:ring-gray-100 focus:border-gray-200 placeholder:text-gray-400 placeholder:text-xs placeholder:lg:text-base placeholder:font-semibold"
          :placeholder="$t('text_review_content_placeholder')"></textarea>
      </div>
      <Button type="submit" color="black" class="flex w-full justify-center" :outline="false"
        :disabled="rating_stars == 0 || !rating_review || disable_submit">
        {{ $t('order_product_rating_btn') }}
      </Button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  product_id: {
    type: Number
  },
  product_name: {
    type: String
  },
  product_image: {
    type: String
  },
  product_rating: {
    type: String,
    default: '0'
  },

})
const rating_stars = ref(0)
const rating_review = ref('')
const rating_success = ref(false)
const disable_submit = ref(false)
async function save_rating() {
  disable_submit.value = true
  rating_success.value = false
  const form_body = {
    "reviewable_type": "App\\Models\\Product",
    "reviewable_id": props.product_id,
    "content": rating_review.value,
    "rating": rating_stars.value
  }
  try {
    const add_rating = await useNuxtApp().$apiFetch('/customer/reviews/create', {
      method: 'POST',
      body: form_body,
    })
    if (add_rating.status && add_rating.data.reviewable_id) {
      console.log(add_rating);
      rating_success.value = true
    }
  } catch (error) {
    console.log(error.data)
    if (
      error.data &&
      error.data.message &&
      error.data.message == 'Unauthenticated.'
    ) {
      unAuthenticated()
    }
    return []
  }
  //console.log(form_body)
}
</script>
