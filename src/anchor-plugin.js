import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview.js';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin.js';

/**
 * Inspiré de https://ckeditor.com/docs/ckeditor5/latest/framework/guides/plugins/creating-simple-plugin.html
 */
export default class AnchorPlugin extends Plugin {

     init() {

         this.editor.ui.componentFactory.add('anchor', locale => {
             const view = new ButtonView(locale);

             view.set({
                 label: 'Insérer ancre',
				 // TODO image à définir
                 // icon: '../../../../frontend-bl-ec/src/images/7z.gif',
                 tooltip: true
             });

			 // on donne une liste arbitraire d'éléments sur lesquels mettre un ancre
			 const elements = [
				 'heading1',
				 'heading2',
				 'heading3',
				 // 'blockquote',
				 'paragraph',
				 'imageBlock',
			 ]
			 elements.forEach( e => {
				 this.editor.model.schema.extend(e, {
					 allowAttributes: 'id'
				 })
			 })


             view.on('execute', () => {

				 // pour ajouter tout simplement un contenu
				 // cf https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/conversion/custom-element-conversion.html
                 this.editor.model.change(writer => {

					console.log('on crée un attribut')
					// const element = this.editor.model.document.selection.anchor.parent
					const element = this.editor.model.document.selection.getSelectedElement()
					const it = this.editor.model.document.selection.getRanges().next()
					console.log(it)
					if (!element) {
						console.log('element sélectionné vide')
						return
					}
					const idValue = prompt('Entrer le nom :')
					writer.setAttribute('id', idValue, element)
                 });

             });

			 // déclenché lors de la réprésentation HTML du composant
			 // détection de tout changement sur l'attribut id
			 this.editor.conversion.for( 'downcast' ).add( dispatcher => {
				dispatcher.on( 'attribute:id', ( evt, data, conversionApi ) => {

				const viewWriter = conversionApi.writer;

				console.log(data)

				viewWriter.setAttribute( 'id', data['attributeNewValue'], conversionApi.mapper.toViewElement(data.item ) )
				console.log('attribute anchor')

				} );
			} );

             return view;
         });
    }
}
