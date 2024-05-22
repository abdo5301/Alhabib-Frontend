<template>
  <div v-if="description" class="border-t border-t-gray-400 pt-[28px] lg:pb-8 pb-9 lg:px-[6px] px-5">
    <h2 :id="'section-accordion-' + section_key">
      <button type="button" @click="active_section = !active_section"
        class="flex items-center justify-between w-full font-bold text-gray-700 text-base leading-5"
        :data-accordion-target="'#section-accordion-body-' + section_key" :aria-expanded="active_section"
        :aria-controls="'section-accordion-body-' + section_key">
        <span>{{ title }}</span>
        <svg v-if="active_section" xmlns="http://www.w3.org/2000/svg" width="39" height="2" viewBox="0 0 39 2"
          fill="none">
          <path d="M38 1L11.5 1L1 1" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 25 28" fill="none">
          <path d="M12.5 1V13.8497M12.5 13.8497V26.6995M12.5 13.8497H24M12.5 13.8497L1 13.8497" stroke="#374151"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </h2>
    <div :class="[active_section ? '': 'hidden']" :id="'section-accordion-body-' + section_key"
      :aria-labelledby="'section-accordion-' + section_key">
      <ClientOnly>
        <div class="pt-6 pb-1 text-base text-black font-medium leading-8" v-html="decodeHtml(description)">
        </div>
        <template #fallback>
          <InlineLoader />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  },
  description: {
    type: String
  },
  first_item: {
    type: Boolean
  },
  last_item: {
    type: Boolean
  },
  opened: {
    type: Boolean,
    default: false
  },
  section_key: {
    type: String
  }
});

const active_section = ref(props.opened)
</script>