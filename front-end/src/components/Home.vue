<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
    
          <v-dialog v-model="adModalEvent" max-width="450">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on" @click="limpiar()">Nuevo evento</v-btn>
            </template>
            <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols=12 sm="12" md="12">
                        <v-text-field v-model="name" label="Nombre del evento"></v-text-field>
                      </v-col>

                      <v-col cols=12 sm="12" md="12">
                        <v-text-field v-model="details" label="Detalles del evento"></v-text-field>
                      </v-col>

                      <v-col cols=12 sm="6" md="6">
                        <!-- <v-text-field v-model="start" label="Inicio"></v-text-field> -->
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="true"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="start1"
                              label="Inicio del evento"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="start1" @input="menu2 = false"></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols=12 sm="6" md="6">
                        <!-- <v-text-field v-model="end" label="Fin"></v-text-field> -->
                        <v-menu
                          v-model="menu3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="end1"
                              label="Termino del evento"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="end1" @input="menu3 = false"></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols=12 sm="12" md="12">
                        <!-- <v-text-field v-model="color" label="Color"></v-text-field> -->
                        <v-select v-model="color" :items="colors" label="Color"></v-select>

                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn @click="close" color="dark darken-1" text large>
                      Cancelar
                    </v-btn>
                    <v-btn  @click="guardar" color="green darken-1" text large >
                      Ingresar
                    </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
  
</template>
<script>
  import axios from 'axios';
  
  export default {
    data: () => ({
      today: new Date().toISOString().substring(0,10),
      focus: new Date().toISOString().substring(0,10),
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      menu3: false,
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      editedIndex: -1, //importante al agregar y editar
      events: [
        // {
        //   name: 'Vacation',
        //   details: 'Going to the beach!',
        //   start: '2019-11-12',
        //   end: '2019-11-14',
        //   color: 'blue',
        // },
      //   {
      //   _id: "5dd5e32c39dc2620796ff7da",
      //   name: "cumpleaños",
      //   details: "es mi cumpleaños",
      //   start: "2019-11-18",
      //   end: "2019-11-18",
      //   color: "blue",
      //   __v: 0
      // },
      // {
      //     _id: "5dd5e34a39dc2620796ff7db",
      //     name: "cumpleaños diego",
      //     details: "es mi cumpleaños del diaego",
      //     start: "2019-11-24",
      //     end: "2019-11-24",
      //     color: "red",
      //     __v: 0
      // },
      // {
      //     _id: "5dd5e37439dc2620796ff7dc",
      //     name: "otro evento",
      //     details: "otro evento",
      //     start: "2019-11-29",
      //     end: "2019-11-29",
      //     color: "green",
      //     __v: 0
      // }
      ],
      // name:'',
      // details:'',
      // color:'',
      colors: [
        {text: 'Azul', value:'blue'},
        {text:'Rojo', value:'red'},
        {text:'Verde',value:'green'},
        {text:'Amarillo',value:'yellow'},
        {text:'Negro', value:'black'}
      ],
      dialog:false,
      currentlyEditing:null,
      _id: '',
      name: '',
      details: '',
      // start: new Date().toISOString().substr(0, 10),
      // end: new Date().toISOString().substr(0, 10),
      start1 : new Date().toISOString().substr(0, 10),
      end1:new Date().toISOString().substr(0, 10),
      start: '', 
      end: '',
      color: '',
      valida: 0,
      validaMensaje: [],
      adModalEvent:0,
      adAccionEvent:0,
      adIdEvent:'',

    }),
    computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar nuevo evento' : 'Editar evento'
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
    },
    mounted () {
      this.$refs.calendar.checkChange();
      this.getEvent();
    },
    methods: { 
      guardar(){
        let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S          
        // if (this.validar()) {
        //   return;
        // }
        if (this.editedIndex > -1) {
          //editar los datos del regisro
           axios.put('evento/update',{
            '_id':this._id,
            'name':this.name, 
            'details': this.details,
            'start': this.start,
            'end': this.end,
            'color': this.color,
            
            },configuracion)
          .then(function (response) {
            me.limpiar();
            me.close();
            me.getEvent();
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          //guardar un nuevo registro
          axios.post('evento/add',{
            'name':this.name, 
            'details': this.details,
            'start': this.start1,
            'end': this.end1,
            'color': this.color,

            },configuracion)
          .then(function (response) {
            me.limpiar();
            me.close();
            me.getEvent();
          }).catch(function (error) {
            console.log(error);
          });
        }
      },
      getEvent(){ //obtiene los eventos de la coleccion
        let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
         axios.get('evento/list',configuracion).then(function (response) {
            me.events = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      }, 
      close () {
        this.adModalEvent=0;
      },
      activarDesactivarMostrar(accion,item){ //ojo no se donde ocupar esto en el componente
        this.adModalEvent=1;
        this.adIdEvent=item._id;
        if (accion ==1) {
          this.adAccionEvent = 1;
        } else if (accion == 2) {
          this.adAccionEvent = 2;
        } else {
          this.adModalEvent=0;
        }
      },
      limpiar(){
        this._id='';
        this.name='';
        this.details='';
        this.start='';
        this.end='';
        this.color='';
        this.valida=0;
        this.validaMensaje=[];
        this.editedIndex=-1;
      },
      editItem (item) {
        this._id=item._id;
        this.name=item.name._id;
        this.details=item.details;
        this.start=item.start;
        this.end=item.end;
        this.color=item.color;
        
        this.dialog = true;
        this.editedIndex=1;
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
    },
  }
</script>