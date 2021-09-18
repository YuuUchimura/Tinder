class ChatRoomsController < ApplicationController

  before_action :authenticate_user!

  def create
    # where => テーブル内の条件に一致したレコードを配列の形で取得
    current_user_chat_rooms = ChatRoomUser.where(user_id: current_user.id).map(&:chat_room)#.map(|x| x.chat_room)
    chat_room = ChatRoomUser.where(chat_room: current_user_chat_rooms, user_id: params[:user_id]).map(&:chat_room).first
    if chat_room.blank?
      chat_room = ChatRoom.create
      ChatRoomUser.create(chat_room: chat_room, user_id: current_user.id)
      ChatRoomUser.create(chat_room: chat_room, user_id: params[:user_id])
    end
    redirect_to action: :show, id: chat_room.id
  end

  def show
    # paramsで送られてきたリクエスト情報をひとまとめにして、params[:パラメータ名]という形で取得している
    # paramsには{id: 1}というハッシュが含まれている
    @chat_room = ChatRoom.find(params[:id])
    # チャットルーム内の自分以外のユーザー情報を取得している
    @chat_room_user = @chat_room.chat_room_users.where.not(user_id: current_user.id).first.user
    # アクセスしたチャットルーム内のチャットメッセージを取得している
    @chat_messages = ChatMessage.where(chat_room: @chat_room)
  end

end
