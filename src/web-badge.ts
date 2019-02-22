( ( script ) =>
{
	const tagname = ( script ? script.dataset.tagname : '' ) || 'web-badge';
	if ( customElements.get( tagname ) ) { return; }

	function Init() { customElements.define( tagname, WebBadge ); }

	class WebBadge extends HTMLElement
	{
		private link: HTMLAnchorElement;
		private nameArea: HTMLDivElement;
		private valueArea: HTMLDivElement;
		constructor()
		{
			super();

			const shadow = this.attachShadow( { mode: 'open' } );

			const style = document.createElement( 'style' );
			style.innerHTML = [
				':host { display: inline-block; width: fit-content; height: 1.7rem; --left-color: gray; --right-color: blue; }',
				':host( [ green ] ) { --right-color: green; }',
				':host > a { display: flex; box-sizing: border-box; border-radius: 0.2rem; overflow: hidden; line-height: 1.5rem; height: 100%; text-decoration: none; color: white; }',
				':host > a > div { padding: 0.2rem; height: 100%; }',
				':host > a > div:empty { display: none; }',
				':host > a > div:first-child { background-color: var( --left-color ); }',
				':host > a > div:last-child { background-color: var( --right-color ); }',
			].join('');

			this.nameArea = document.createElement( 'div' );
			this.valueArea = document.createElement( 'div' );

			this.link = document.createElement( 'a' );
			this.link.rel = 'noopener noreferrer';
			this.link.appendChild( this.nameArea );
			this.link.appendChild( this.valueArea );

			if ( this.hasAttribute( 'name' ) ) { this.name = <string>this.getAttribute( 'name' ); }
			if ( this.hasAttribute( 'value' ) ) { this.value = <string>this.getAttribute( 'name' ); }
			this.target = this.getAttribute( 'target' ) || '_blank';

			shadow.appendChild( style );
			shadow.appendChild( this.link );
		}

		static get observedAttributes() { return [ 'name', 'value', 'href', 'target' ]; }

		get name() { return this.getAttribute( 'name' ) || ''; }
		set name( value ) { this.nameArea.textContent = value || ''; this.setAttribute( 'name', value || '' ); }

		get value() { return this.getAttribute( 'value' ) || ''; }
		set value( value ) { this.valueArea.textContent = value || ''; this.setAttribute( 'value', value || '' ); }

		get href() { return this.getAttribute( 'href' ) || ''; }
		set href( value ) { this.link.href = value || ''; this.setAttribute( 'href', value || '' ); }

		get target() { return this.getAttribute( 'target' ) || ''; }
		set target( value ) { this.link.target = value || ''; this.setAttribute( 'target', value || '' ); }

		public attributeChangedCallback( name: string, oldValue: any, newValue: any )
		{
			if ( oldValue === newValue ) { return; }
			switch ( name )
			{
				case 'name': this.name = newValue; break;
				case 'value': this.value = newValue; break;
				case 'href': this.href = newValue; break;
			}
		}

	}

	if ( document.readyState === 'loading' )
	{
		document.addEventListener( 'DOMContentLoaded', Init );
	} else { Init(); }
})( document.currentScript );
