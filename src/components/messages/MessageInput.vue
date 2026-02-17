<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { createMessage } from '@/api/message';
import { useStore } from '@/store';

const messageInput = ref('');
const preview = ref('');
const contentType = ref('Text');
const store = useStore();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

// Character limits
const TEXT_LIMIT = 400;
const IMAGE_LIMIT = 1000;
const isImageMode = ref(false);
const isOverLimit = ref(false);

// Computed max length for textarea
const maxLength = computed(() => isImageMode.value ? IMAGE_LIMIT : TEXT_LIMIT);

// Load draft when channel changes
watch(() => store.currentChannel?.id, (channelId) => {
    if (channelId) {
        messageInput.value = store.getDraftForChannel(channelId) ?? '';
    }
});

// Save draft on input change + auto-resize + limits
const handleInput = async (e: Event) => {
    const textarea = e.target as HTMLTextAreaElement;
    const trimmedInput = messageInput.value.trim();

    // Save draft to store
    if (store.currentChannel) {
        store.setDraftForChannel(store.currentChannel.id, messageInput.value);
    }

    // Auto-grow textarea
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Check image and set mode
    const isImage = await isValidImageUrl(trimmedInput);
    isImageMode.value = isImage;

    // Check limits
    isOverLimit.value = messageInput.value.length > maxLength.value;

    if (isImage && !isOverLimit.value) {
        contentType.value = 'Image';
        preview.value = trimmedInput;
    } else if (!isImage && !isOverLimit.value) {
        contentType.value = 'Text';
        preview.value = '';
    } else {
        // Over limit - clear preview
        preview.value = '';
    }
};

const isValidImageUrl = async (url: string) => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');
        return contentType?.startsWith('image/') ?? false;
    } catch {
        return false;
    }
};

// Reset textarea height after clearing content
const resetTextareaHeight = () => {
    if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        textareaRef.value.style.height = '40px';
    }
};

const handleSubmit = async (e?: Event) => {
    if (e) e.preventDefault();

    if (!messageInput.value.trim() || isOverLimit.value) return;

    await createMessage(store.currentChannel!.id, contentType.value, messageInput.value);
    store.clearDraftForChannel(store.currentChannel!.id);

    messageInput.value = '';
    preview.value = '';
    contentType.value = 'Text';
    isImageMode.value = false;
    isOverLimit.value = false;

    nextTick(resetTextareaHeight);
};

// Handle Enter key (submit on Enter, new line on Shift+Enter)
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
    }
};
</script>

<template>
    <div class="message-input-container">
        <!-- Preview -->
        <div v-if="preview" class="preview">
            <img :src="preview" :alt="messageInput" />
        </div>

        <!-- Form -->
        <form @submit="handleSubmit">
            <textarea
                ref="textareaRef"
                v-model="messageInput"
                @input="handleInput"
                @keydown="handleKeydown"
                placeholder="Type a message or paste an image URL..."
                rows="1"
            />
            <input
                type="submit"
                value="Send"
                :disabled="isOverLimit || !messageInput.trim()"
            />
        </form>

        <!-- Character Counter -->
        <div v-if="messageInput" class="char-counter">
            <span>{{ messageInput.length }} / {{ maxLength }}</span>
            <span v-if="isOverLimit" class="error">(LIMIT EXCEEDED)</span>
        </div>
    </div>
</template>

<style scoped>
.message-input-container {
    width: 100%;
}

form {
    display: flex;
    gap: 5px;
}

input[type="submit"] {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    flex-shrink: 0;
}

input[type="submit"]:hover:not(:disabled) {
    background-color: #0056b3;
}

input[type="submit"]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.preview {
    margin-top: 10px;
}

.preview img {
    max-width: 300px;
    border-radius: 5px;
}

textarea {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    min-height: 40px;
    max-height: 300px;
    resize: none;
    overflow: hidden;
    line-height: 1.4;
    font-family: inherit;
    font-size: inherit;
    box-sizing: border-box;
}

textarea:focus {
    outline: none;
    border-color: #007bff;
}

/* Character Counter */
.char-counter {
    font-size: 12px;
    color: #666;
    text-align: right;
    padding: 4px 10px 0;
}

.char-counter .error {
    color: #dc3545;
    font-weight: bold;
    margin-left: 8px;
}
</style>
