##
# Application Form Builder
#
class ApplicationFormBuilder < ActionView::Helpers::FormBuilder

  ##
  # text_fieldを拡張
  # @version 2018/06/10
  #
  def text_field(attribute, options = {})
    
    # model情報が存在する場合はバリデーション結果を付加する
    field_with_error(attribute, options) do
      
      super(attribute, options.merge({ autocomplete: :off, spellcheck: false }))
    end
  end

  ##
  # text_areaを拡張
  # @version 2018/06/10
  #
  def text_area(attribute, options = {})

    # model情報が存在する場合はバリデーション結果を付加する
    field_with_error(attribute, options) do
      
      super(attribute, options.merge({ autocomplete: :off, spellcheck: false }))
    end
  end

  ##
  # selectを拡張
  # @version 2018/06/10
  #
  def select(attribute, choices = nil, options = {}, html_options = {}, &block)

    # model情報が存在する場合はバリデーション結果を付加する
    field_with_error(attribute, options) do
      
      super(attribute, choices, options, html_options, &block)
    end
  end

  ##
  # check_boxを拡張
  # @version 2018/06/10
  #
  def check_box(attribute, options = {}, checked_value = '1', unchecked_value = '0')

    # model情報が存在する場合はバリデーション結果を付加する
    field_with_error(attribute, options) do
      
      super(attribute, options, checked_value, unchecked_value)
    end
  end

  private

    ##
    # 従来のフォームに加えて、エラーがある場合にエラーメッセージを表示
    # @version 2018/06/10
    #
    def field_with_error(attribute, options={}, &block)

      return block.call if @object.blank?

      # 入力フォームと同じ属性のエラーメッセージを取得する
      error_messages = @object.errors.full_messages_for attribute

      return block.call if error_messages.blank?

      # 従来の入力フォーム と 生成されたエラーメッセージを連結
      error_field(error_messages) + block.call
    end

    ##
    # エラーメッセージ表示用ブロックを生成する
    # @version 2018/06/10
    #
    def error_field(messages)

      @template.tag.div(messages, class: 'c-form-error') do
        messages.each do |message|                                              
          @template.concat(@template.tag.div(message))                
        end                                                                     
      end          
    end
end
