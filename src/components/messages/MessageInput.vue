<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { createMessage } from '@/api/message';
import { useStore } from '@/store';

// ========== STATE MANAGEMENT ==========
const messageInput = ref('');
const preview = ref('');
const contentType = ref('Text');
const store = useStore();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

// Character limits for different content types
const TEXT_LIMIT = 400;
const IMAGE_LIMIT = 1000;
const isImageMode = ref(false);
const isOverLimit = ref(false);

// Dynamically compute max length based on content type
const maxLength = computed(() => isImageMode.value ? IMAGE_LIMIT : TEXT_LIMIT);

// ========== DRAFT PERSISTENCE & INITIALIZATION ==========
// Load draft when channel changes and adjust textarea height accordingly
watch(() => store.currentChannel?.id, async (channelId) => {
    if (channelId) {
        // Retrieve saved draft from store
        messageInput.value = store.getDraftForChannel(channelId) ?? '';

        await nextTick();
        resetTextareaHeight();

        // If draft has content, expand textarea to fit
        if (textareaRef.value && messageInput.value.length > 0) {
            textareaRef.value.style.height = 'auto';
            textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
        }
    }
});

// ========== INPUT HANDLING ==========
// Handle input: save draft, auto-resize textarea, validate image URL, check character limits
const handleInput = async (e: Event) => {
    const textarea = e.target as HTMLTextAreaElement;
    const trimmedInput = messageInput.value.trim();

    // Persist draft to store for channel
    if (store.currentChannel) {
        store.setDraftForChannel(store.currentChannel.id, messageInput.value);
    }

    // Auto-grow textarea to fit content
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Validate if input is an image URL
    const isImage = await isValidImageUrl(trimmedInput);
    isImageMode.value = isImage;

    // Check if message exceeds character limit
    isOverLimit.value = messageInput.value.length > maxLength.value;

    // Update content type and preview based on validation results
    if (isImage && !isOverLimit.value) {
        contentType.value = 'Image';
        preview.value = trimmedInput;
    } else if (!isImage && !isOverLimit.value) {
        contentType.value = 'Text';
        preview.value = '';
    } else {
        // Clear preview if over limit
        preview.value = '';
    }
};

// ========== UTILITIES ==========
// Validate if URL points to a valid image by checking Content-Type header
const isValidImageUrl = async (url: string) => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');
        return contentType?.startsWith('image/') ?? false;
    } catch {
        // URL fetch failed - not a valid image
        return false;
    }
};

// Reset textarea to minimum height
const resetTextareaHeight = () => {
    if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        textareaRef.value.style.height = '40px';
    }
};

// ========== MESSAGE SUBMISSION ==========
// Submit message to API and clear input
const handleSubmit = async (e?: Event) => {
    if (e) e.preventDefault();

    // Validate before submission
    if (!messageInput.value.trim() || isOverLimit.value) return;

    // Send message via API
    await createMessage(store.currentChannel!.id, contentType.value, messageInput.value);

    // Clear draft from store after successful submission
    store.clearDraftForChannel(store.currentChannel!.id);

    // Reset all input state
    messageInput.value = '';
    preview.value = '';
    contentType.value = 'Text';
    isImageMode.value = false;
    isOverLimit.value = false;

    nextTick(resetTextareaHeight);
};

// ========== KEYBOARD SHORTCUTS ==========
// Enter: submit message | Shift+Enter: new line
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
    }
};
</script>

<template>
    <section class="message-input-container">
        <!-- Character counter (only shown when typing) -->
        <span class="headbar">
            <div v-if="messageInput" class="char-counter">
                <p :class="{ 'error': isOverLimit }">
                    {{ messageInput.length }} / {{ maxLength }}
                </p>
            </div>
        </span>

        <!-- Image preview (only shown for valid image URLs) -->
        <div v-if="preview" class="preview">
            <img :src="preview" :alt="messageInput" />
        </div>

        <!-- Message input form -->
        <form @submit="handleSubmit">
            <textarea
                ref="textareaRef"
                v-model="messageInput"
                @input="handleInput"
                @keydown="handleKeydown"
                placeholder="Type a message or paste an image URL..."
                rows="1"
            />
            <div class="btn-bar">
                <input
                    class="btn-style"
                    type="submit"
                    value="Send"
                    :disabled="isOverLimit || !messageInput.trim()"
                />
            </div>
        </form>
    </section>
</template>

<style scoped>
.message-input-container {
    width: 100%;
}

form {
    display: flex;
    gap: 5px;
}

.btn-bar {
    padding: 10px;
    flex-direction: column;
    gap: 8px;
}

.btn-style {
    padding: 5px 25%;
    width: 5dvw;
    min-width: 100px;
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

.char-counter {
    font-size: 0.6em;
}

.char-counter .error {
    color: red;
    font-weight: bold;
}

.headbar {
    height: 25px;
}
</style>
