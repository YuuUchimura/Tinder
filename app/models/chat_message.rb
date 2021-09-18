class ChatMessage < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room
  # データを保存後にChatMessageBroadcastJobを実行する
  after_create_commit { ChatMessageBroadcastJob.perform_later self }

end
