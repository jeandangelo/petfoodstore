import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    {
      id: 'description',
      label: 'Descripción',
      icon: 'file-text',
      content: (
        <div className="space-y-4">
          <p className="font-body text-foreground leading-relaxed">
            {product.fullDescription}
          </p>
          {product.specifications && (
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3">Especificaciones</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="font-body text-sm text-muted-foreground capitalize">{key}:</span>
                    <span className="font-body text-sm text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'ingredients',
      label: 'Ingredientes',
      icon: 'leaf',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-heading font-semibold text-lg mb-3">Composición</h4>
            <p className="font-body text-foreground leading-relaxed mb-4">
              {product.ingredients}
            </p>
          </div>
          {product.nutritionalInfo && (
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3">Información nutricional</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                  <div key={key} className="bg-muted p-3 rounded-lg text-center">
                    <div className="font-heading font-bold text-lg text-primary">{value}</div>
                    <div className="font-caption text-xs text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'feeding',
      label: 'Alimentación',
      icon: 'utensils',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-heading font-semibold text-lg mb-3">Guía de alimentación</h4>
            <p className="font-body text-foreground leading-relaxed mb-4">
              {product.feedingGuide}
            </p>
          </div>
          {product.feedingChart && (
            <div>
              <h4 className="font-heading font-semibold text-lg mb-3">Tabla de alimentación diaria</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-lg">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left font-body font-semibold text-sm">Peso del animal</th>
                      <th className="px-4 py-2 text-left font-body font-semibold text-sm">Cantidad diaria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.feedingChart.map((row, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="px-4 py-2 font-body text-sm">{row.weight}</td>
                        <td className="px-4 py-2 font-body text-sm font-medium">{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'reviews',
      label: 'Reseñas',
      icon: 'star',
      content: (
        <div className="space-y-6">
          {/* Rating Summary */}
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <div className="font-heading font-bold text-3xl text-primary">{product.rating}</div>
              <div className="flex items-center justify-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <div className="font-caption text-xs text-muted-foreground">
                {product.reviewCount} reseñas
              </div>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = product.ratingBreakdown?.[stars] || 0;
                const percentage = product.reviewCount > 0 ? (count / product.reviewCount) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center space-x-2 mb-1">
                    <span className="font-caption text-xs w-8">{stars}★</span>
                    <div className="flex-1 bg-border rounded-full h-2">
                      <div
                        className="bg-warning h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="font-caption text-xs text-muted-foreground w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {product.reviews?.map((review, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-body font-semibold text-sm">{review.author}</div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="star"
                          size={14}
                          className={i < review.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="font-caption text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default ProductTabs;