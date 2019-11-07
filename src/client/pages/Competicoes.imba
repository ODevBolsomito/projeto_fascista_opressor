const axios = require('axios')

import State from '../State'
import Crud from '../components/Crud'
import Competicao from '../models/Competicao'


export tag Competicoes

  prop form
  prop list

  def novaCompeticao
    form = true

  def listaCompeticao
    list = true

  def render
    <self .main>
      if form
        <Form :close=(do form = false)>
      if list
        <List>
      else
        <div>
          <div .login>
            <div .row>
              <div .col :tap.novaCompeticao>
                <div .card style="height: 36vh;">
                  <div .card-body .card-body-button>
                    <header .content__title .card-body-button-header>
                      <h1>
                        "Nova competição"
                      <i .zmdi .zmdi-plus-circle .zmdi-hc-5x>

              <div .col :tap.listaCompeticao>
                <div .card style="height: 36vh;">
                  <div .card-body .card-body-button>
                    <header .content__title .card-body-button-header>
                      <h1>
                        "Competição já cadastrada"
                      <i .zmdi .zmdi-view-list-alt .zmdi-hc-5x>


tag List

  def selecionaCompeticao comp
    State:competicao = comp
    window:sessionStorage.setItem('competicao', JSON.stringify(State:competicao))
    window:location.assign '#/equipes'

  def render
    <self .content .content--full .fadeIn .animated>
      <header .content__title>
        <h1>
          "Selecione uma competições"
      <Crud 
        model=Competicao
        :select=(do |e| selecionaCompeticao(e.data))
      >


tag Form
  def create
    State:competicao = await Competicao.create
        competicao:
            nome: @nome
    window:sessionStorage.setItem('competicao', JSON.stringify(State:competicao))
    window:location.assign '#/equipes'

  def clickOut e
    if e.event:target:classList.contains('modal')
        @closing = true
        Imba.setTimeout 300, do
            trigger :close
            @closing = false

  def render
    <self>
        <div :mousedown.clickOut .modal .fadeIn .animated .show style="display: block;">
            <div .modal-dialog>
                <div .modal-content .model-form-content .animated .fadeInUp .fadeOutDown=(@closing)>
                    <div .modal-header>
                        <h5 .modal-title>
                            'Nova competição'

                    <div .modal-body>
                      <form>
                        <div .form-row>
                            <div .col>
                                <div .form-group>
                                    <input[@nome] :keydown.esc.trigger(:close) autofocus .form-control .form-control-lg placeholder='nome'>

                    <div .modal-footer>
                        <button type="button" .btn .btn-link :tap.create>
                            if @loading
                                <i .zmdi .zmdi-spinner .zmdi-hc-spin>
                            ' Criar'