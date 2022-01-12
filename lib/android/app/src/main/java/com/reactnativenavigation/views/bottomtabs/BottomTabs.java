package com.reactnativenavigation.views.bottomtabs;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;
import com.reactnativenavigation.R;
import com.reactnativenavigation.options.LayoutDirection;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.IntRange;

import static com.reactnativenavigation.utils.CollectionUtils.*;
import static com.reactnativenavigation.utils.ViewUtils.findChildByClass;

@SuppressLint("ViewConstructor")
public class BottomTabs extends AHBottomNavigation {
    private boolean itemsCreationEnabled = true;
    private boolean shouldCreateItems = true;
    private List<Runnable> onItemCreationEnabled = new ArrayList<>();

    public BottomTabs(Context context) {
        super(context);
        setId(R.id.bottomTabs);
    }

    public void disableItemsCreation() {
        itemsCreationEnabled = false;
    }

    public void enableItemsCreation() {
        itemsCreationEnabled = true;
        if (shouldCreateItems) {
            shouldCreateItems = false;
            createItems();
            forEach(onItemCreationEnabled, Runnable::run);
            onItemCreationEnabled.clear();
        }
    }

    @Override
    public void onSizeChanged(int w, int h, int oldw, int oldh) {
        if (hasItemsAndIsMeasured(w, h, oldw, oldh))
            createItems();
    }

    @Override
    protected void createItems() {
        if (itemsCreationEnabled) {
            superCreateItems();
        } else {
            shouldCreateItems = true;
        }
    }

    public void superCreateItems() {
        super.createItems();
        int count = getChildCount();
        // 查找Items容器
        for (int i = count - 1; i >= 0; i--) {
            View view = getChildAt(i);
            if (view instanceof LinearLayout) {
                LinearLayout bottomLayout = (LinearLayout) view;
                // 对每个Item的layout_weight设置值，使其均分底部空间
                int childCount = bottomLayout.getChildCount();
                for (int a = 0; a < childCount; a++) {
                    FrameLayout current = (FrameLayout) bottomLayout.getChildAt(a);
                    current.setLayoutParams(
                            new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.MATCH_PARENT, 1f));
                    current.setPadding(0, current.getPaddingTop(), 0, 0);
                    // 更改text样式
                    TextView text = (TextView) current.getChildAt(1);
                    FrameLayout.LayoutParams lp = (FrameLayout.LayoutParams) text.getLayoutParams();
                    // 设置边距
                    lp.bottomMargin = 4;
                    text.setLayoutParams(lp);
                }
                break;
            }
        }
    }

    @Override
    public void setCurrentItem(@IntRange(from = 0) int position) {
        setCurrentItem(position, true);
    }

    @Override
    public void setCurrentItem(@IntRange(from = 0) int position, boolean useCallback) {
        if (itemsCreationEnabled) {
            super.setCurrentItem(position, useCallback);
        } else {
            onItemCreationEnabled.add(() -> super.setCurrentItem(position, useCallback));
        }
    }

    @Override
    public void setTitleState(TitleState titleState) {
        if (getTitleState() != titleState)
            super.setTitleState(titleState);
    }

    @Override
    public void setBackgroundColor(int color) {
        super.setBackgroundColor(color);
        if (getDefaultBackgroundColor() != color)
            setDefaultBackgroundColor(color);
    }

    @Override
    public void restoreBottomNavigation(boolean withAnimation) {
        super.restoreBottomNavigation(withAnimation);
        if (!withAnimation)
            setVisibility(View.VISIBLE);
    }

    @Override
    public void hideBottomNavigation(boolean withAnimation) {
        super.hideBottomNavigation(withAnimation);
        if (!withAnimation)
            setVisibility(View.GONE);
    }

    public void setText(int index, String text) {
        AHBottomNavigationItem item = getItem(index);
        if (!item.getTitle(getContext()).equals(text)) {
            item.setTitle(text);
            refresh();
        }
    }

    public void setIcon(int index, Drawable icon) {
        AHBottomNavigationItem item = getItem(index);
        if (!item.getDrawable(getContext()).equals(icon)) {
            item.setIcon(icon);
            refresh();
        }
    }

    public void setSelectedIcon(int index, Drawable icon) {
        AHBottomNavigationItem item = getItem(index);
        if (!item.getDrawable(getContext()).equals(icon)) {
            item.setSelectedIcon(icon);
            refresh();
        }
    }

    public void setLayoutDirection(LayoutDirection direction) {
        LinearLayout tabsContainer = findChildByClass(this, LinearLayout.class);
        if (tabsContainer != null)
            tabsContainer.setLayoutDirection(direction.get());
    }

    private boolean hasItemsAndIsMeasured(int w, int h, int oldw, int oldh) {
        return w != 0 && h != 0 && (w != oldw || h != oldh) && getItemsCount() > 0;
    }
}
