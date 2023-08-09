<template>
  <Listbox as="div" v-model="selected">
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"> <slot /> </ListboxLabel>
    <div class="relative">
      <ListboxButton v-if="!label_selected" class="relative flex items-center w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6">
        <span class="flex items-center">
          <img v-if="with_image" :src="selected.image" alt="" :class="['w-8 lg:w-10 flex-shrink-0 rounded-full',img_style??img_style]" />
          <span v-if="with_name && label_selected_name" :class="[(with_image? 'ltr:ml-3 rtl:mr-3':''),'block truncate']">{{ selected.name }}</span>
        </span>
        <span v-if="select_icon" class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <ListboxButton v-if="label_selected" class="flex items-center">
        <span class="flex items-center">
          <img  v-if="with_image" :src="selected.image" alt="" :class="[label_selected_name && with_name ? 'h-5 w-5':'w-8 lg:w-10','flex-shrink-0 rounded-full',img_style??img_style]" />
          <span v-if="with_name && label_selected_name" :class="[(with_image? 'ltr:ml-3 rtl:mr-3':''),'block truncate']">{{ selected.name }}</span>
        </span>
        <span v-if="select_icon" class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full min-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="item in props.select_data" :key="item.id" :value="item" v-slot="{ active, selected }">
            <li  :class="[active ? 'bg-gray-400 text-white' : 'text-gray-900',selected ? 'hidden' : '', 'relative cursor-default select-none']">
              <NuxtLink :to="item.href" class="flex items-center w-full py-2 ltr:pl-3 rtl:pr-3 ltr:pr-6 rtl:pl-6">
                <img  v-if="with_image" :src="item.image" alt="" :class="['h-5 w-5 flex-shrink-0 rounded-full',img_style??img_style]" />
                <span v-if="with_name" :class="[(selected ? 'font-semibold' : 'font-normal'), (with_image? 'ltr:ml-3 rtl:mr-3':''),'block truncate']">{{ item.name }}</span>
              </NuxtLink>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  select_data : { 
    type: Object, 
  },
  data_type : {
    type: String
  },
  label_selected :{
    type: Boolean,
    default:false
  },
  label_selected_name :{
    type: Boolean,
    default:false
  },
  select_icon : {
    type: Boolean,
    default:false
  },
  with_image: {
    type: Boolean,
    default:false
  },
  with_name: {
    type: Boolean,
    default:false
  },
  selected_id: {
    type: Number,
    default:1
  },
  img_style: {
    type: String,
  }

})

const selected = ref(props.select_data[props.selected_id])

</script>