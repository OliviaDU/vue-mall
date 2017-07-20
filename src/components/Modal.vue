<template>
    <div>
        <!-- 登录模态框 start -->
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':modalShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="closeModal">关闭</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                    </div>
                    <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <!-- 登录模态框 end -->
    
        <!-- 遮罩层 start -->
        <div class="md-overlay" v-show="modalShow" @click="closeModal"></div>
        <!-- 遮罩层 end -->
    </div>
</template>

<script>
export default {
    props: ['modalShow'],
    data() {
        return {
        }
    },
    methods: {
        closeModal(){
            this.$emit('close');
        }
    }
}
</script>