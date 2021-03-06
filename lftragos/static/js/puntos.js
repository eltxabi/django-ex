(function(angular) {
  'use strict';
angular.module('puntos', ['dataService','dialog'])
  
  .component('puntosTab', {
    templateUrl: 'static/templates/puntosTab.html',
    require: {
       appAdmin: '^appAdmin'
    },
    bindings: { $router: '<' },
    controller: PuntosTabComponent
    
  })

  .component('alineadosList', {
    templateUrl:'static/templates/alineadosList.html',
    require: {
       appAdmin: '^appAdmin',
       puntosTab: '^puntosTab'
    },
    bindings: { $router: '<' },
    controller: AlineadosListComponent,
    $canActivate: function($nextInstruction, $prevInstruction) {
      console.log('$canActivate', arguments);
    }
  })

  .component('jornadasaliSelect', {
    templateUrl:'static/templates/jornadasaliSelect.html',
    require: {
       appAdmin: '^appAdmin',
       puntosTab: '^puntosTab'
    },
    bindings: { $router: '<' },
    controller: JornadasaliSelectComponent,
    $canActivate: function($nextInstruction, $prevInstruction) {
      console.log('$canActivate', arguments);
    }
  })

  


function PuntosTabComponent(equiposService,$scope) {
  var alineadosList = []; 
  var jornadaActual = null;
  var ctrl = this;

  this.$routerOnActivate = function(next) {
    console.log('$routerOnActivate', this, arguments);
  };

  $scope.$watch('$ctrl.appAdmin.lista_jornadas',function(newVal,oldVal){
    if (ctrl.appAdmin.lista_jornadas[0]){
       ctrl.jornadaActual = ctrl.appAdmin.lista_jornadas[0].numero;
       console.log(ctrl.jornadaActual);
    }
  });

  $scope.$watch('$ctrl.jornadaActual',function(newVal,oldVal){
    if (ctrl.jornadaActual){ctrl.getAlineadosJornada(ctrl.jornadaActual);}
  });

  this.getAlineadosJornada = function(){
    equiposService.getJugadoresJornada(ctrl.jornadaActual).then(function(alineacion) {
      ctrl.alineadosList = alineacion.data;
      if (!ctrl.alineadosList){
	ctrl.alineadosList=[];	
      }
      console.log("alineadosList "+ctrl.alineadosList)
        
    });
  }

  this.enviarPuntos = function(){
    ctrl.appAdmin.enviarPuntos(ctrl.jornadaActual,ctrl.alineadosList);
  }
  
}

function AlineadosListComponent() {
  var ctrl = this;

  this.$routerOnActivate = function(next) {
    console.log('$routerOnActivate', this, arguments);
  };

}

function JornadasaliSelectComponent() {
  var ctrl = this;

  this.$routerOnActivate = function(next) {
    console.log('$routerOnActivate', this, arguments);
  };

  this.$onInit = function () {
    this.puntosTab.jornadaActual = null;
    if (this.appAdmin.lista_jornadas[0]){
       this.puntosTab.jornadaActual = this.appAdmin.lista_jornadas[0].numero;
    }
    console.log("jorandas actual "+this.puntosTab.jornadaActual )
  };

}

})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
