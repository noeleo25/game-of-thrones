const PartSelector = { 
            template: ` <div class="body-part position-relative">
                            <div class="prev-area" @mouseover="hoverPrev = true"  @mouseleave="hoverPrev = false">
                                <button class="prev-btn" v-if="hoverPrev" @click="selectPrevPart()"> &#10094; </button>
                            </div>
                            <img class="body-img" :class="imgClass" :src="selectedPart.src"/>
                            <div class="next-area" @mouseover="hoverNext = true" @mouseleave="hoverNext = false">
                                <button class="next-btn" v-if="hoverNext" @click="selectNextPart()"> &#10095; </button>
                            </div>
                        </div>`,
            props: {
                parts: {
                    type: Array,
                    required: true
                },
                rand: {
                    type: Boolean
                },
                about: {
                    type: Boolean
                }
            },
            data() {
                return { 
                    hoverPrev: false,
                    hoverNext: false,
                    selectedPartIndex: 0,
                    minIndex: 0,
                    maxIndex: this.parts.length - 1,
                };
            },
            watch: {
                rand: function(val){
                    if(val == true){
                        this.selectedPartIndex =  Math.floor(Math.random() * (this.maxIndex - this.minIndex + 1) ) + this.minIndex;
                    }
                    this.$emit('partSelected', this.selectedPart);
                    this.$emit('randomInvoked', true);
                }
            },
            computed: {
                selectedPart() {
                    return this.parts[this.selectedPartIndex];
                },
                imgClass() {
                    if(this.about){
                        return this.selectedPart.type + "-img about-selected";
                    }
                    return this.selectedPart.type + "-img";
                }
            },
            methods: {
                selectPrevPart(){
                    this.selectedPartIndex = this.selectedPartIndex > this.minIndex ? this.selectedPartIndex - 1 : this.maxIndex;
                    this.emitSelected();
                },
                selectNextPart(){
                    this.selectedPartIndex = this.selectedPartIndex < this.maxIndex ? this.selectedPartIndex + 1 : 0;
                    this.emitSelected();
                },
                emitSelected(){
                    this.$emit('partSelected', this.selectedPart);
                }
            },
            created() {
                this.emitSelected();
            },
        }