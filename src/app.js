const app = new Vue({
  el: '#app',
  data: {
    message: 'Hey, Vue!',
    isActive: true,
    error: null,
  },
  computed: {
    classObject: function() {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.hasError && this.error.type === 'fatal',
      }
    }
  }
});

app.message = 'Hey!';

const app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'Вы загрузили эту страницу: ' + new Date().toLocaleString()
  }
});

const app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
});

const app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Изучить JavaScript' },
      { text: 'Изучить Vue' },
      { text: 'Создать что-нибудь классное' }
    ]
  }
});

const app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hey, Vue.js!'
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split('').reverse().join('');
    }
  }
});

const app6= new Vue({
  el: '#app-6',
  data: {
    message: 'Hello, Vue!'
  }
});


// Определяем новый компонент под имененм todo-item
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});

const app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Овощи' },
      { id: 1, text: 'Сыр' },
      { id: 2, text: 'Что там ещё люди едят?' }
    ]
  }
});


const obj = {
  foo: 'bar',
};

Object.freeze(obj);

new Vue({
  el: '#app-8',
  data: obj,
});


const app9 = new Vue({
  el: '#app-9',
  data: {
    rawHtml: '<span style="color:red">Текст должен быть красным</span>',
    isButtonDisabled: true,
    id: 'knopki',
    ok: true,
    someattr: 'style',
    value: 'orange',
  }
});


const example = new Vue({
  el: '#example',
  data: {
    message: 'Hello',
  },
  computed: {
    // геттер вычисляемого значения
    reversedMessage: function() {
      // `this` указывает на экземпляр example
      return this.message.split('').reverse().join('');
    },
  }
});

console.log(example.reversedMessage);
example.message = 'Good bye!';
console.log(example.reversedMessage);


const demo = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
  },
  computed: {
    fullName: {
      // геттер
      get: function() {
        return this.firstName + ' ' + this.lastName;
      },

      set: function(newValue) {
        var names = newValue.split(' ');
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    }
  }
});


const watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'Пока вы не зададите вопрос, я не могу ответить!',
  },
  watch: {
    // эта функция запускается при любом изменении вопроса
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Ожидаю, когда вы закончите печатать...';
      this.debouncedGetAnswer();
    }
  },
  created: function() {
    // _.debounce — это функция lodash, позволяющая ограничить то,
    // насколько часто может выполняться определённая операция.
    // В данном случае мы ограничиваем частоту обращений к yesno.wtf/api,
    // дожидаясь завершения печати вопроса перед отправкой ajax-запроса.
    // Узнать больше о функции _.debounce (и её родственнице _.throttle),
    // можно в документации: https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  methods: {
    getAnswer: function() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)';
        return;
      }
      this.answer = 'Думаю…';
      const vm = this;
      axios.get('https://yesno.wtf/api')
        .then(function(response) {
          vm.answer = _.capitalize(response.data.answer);
        })
        .catch(function(error) {
          vm.answer = 'Ошибка! Не могу связаться с API. ' + error;
        });
    }
  }
});
